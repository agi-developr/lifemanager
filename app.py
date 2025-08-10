import os
import uuid
import requests
import numpy as np
import pandas as pd
import sympy as sp
import streamlit as st
from langchain_openai import ChatOpenAI


# --- Streamlit page config & dark-style markdown ---
st.set_page_config(
    page_title="CollabAlign",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Simple dark theme styling (works without external config)
st.markdown(
    """
    <style>
    [data-testid="stAppViewContainer"] { background-color: #0e1117; color: #e8eaed; }
    [data-testid="stSidebar"] { background-color: #0b0f14; }
    .stMarkdown, .stText, .stTextInput>div>div>input, .stTextArea textarea { color: #e8eaed !important; }
    h1, h2, h3, h4, h5, h6 { color: #e8eaed; }
    .stButton>button { background-color: #262730; color: #f5f5f5; border: 1px solid #3a3a3a; }
    .stProgress > div > div > div > div { background-color: #4c8bf5; }
    </style>
    """,
    unsafe_allow_html=True,
)


# --- LLM setup ---
api_key = os.getenv("OPENAI_API_KEY", "sk-placeholder-gpt5")
llm = ChatOpenAI(api_key=api_key, model="gpt-5", temperature=0.7)


# --- Personality analysis function ---
def analyze_personality(responses: dict, career_mode: bool) -> str:
    """Analyze personality responses and return a collaborative alignment summary.

    Uses a diverse, inclusive lens; emphasizes AI-era resilience.
    """
    prompt = (
        "Diverse, inclusive lens. "
        + "Analyze traits "
        + f"{responses} for passion alignment. Map to collaboration opportunities "
        + "(e.g., high extraversion = great co-founder). Factor AI trends and unemployment-risk "
        + "for career resilience. "
        + ("Emphasize jobs and roles over businesses. " if career_mode else "Emphasize startup and project opportunities. ")
        + "Output: 1) Short summary; 2) Bullet passion list aligned to teamwork and resilience."
    )
    try:
        messages = [
            {"role": "system", "content": "You are CollabAlign, an expert in collaborative personality synthesis."},
            {"role": "user", "content": prompt},
        ]
        result = llm.invoke(messages)
        return getattr(result, "content", "") or str(result)
    except Exception as exc:
        # Fallback keeps flow moving in hackathon setting
        return (
            "Summary: Collaborative profile generated.\n\n"
            "- Passions: learning, building, teaming, community.\n"
            f"- Mode: {'Career' if career_mode else 'Startup'} resilience focus.\n"
            f"- Note: offline analysis due to error: {exc}"
        )


# --- Session state init ---
if "stage" not in st.session_state:
    st.session_state.stage = "welcome"
if "session_id" not in st.session_state:
    st.session_state.session_id = str(uuid.uuid4())
if "responses" not in st.session_state:
    st.session_state.responses = {}
if "alignment" not in st.session_state:
    st.session_state.alignment = ""
if "skills_passions" not in st.session_state:
    st.session_state.skills_passions = {}
if "ideas" not in st.session_state:
    st.session_state.ideas = []
if "cofounders" not in st.session_state:
    st.session_state.cofounders = []
if "shared_users" not in st.session_state:
    st.session_state.shared_users = []  # mock list for collab
if "career_focus_mode" not in st.session_state:
    st.session_state.career_focus_mode = False
if "progress_override" not in st.session_state:
    st.session_state.progress_override = 0


# --- API key edge handling ---
if api_key.startswith("sk-placeholder") or len(api_key.strip()) == 0:
    st.error(
        "OPENAI_API_KEY is not set. Using a placeholder; AI features may not function. Set env var OPENAI_API_KEY.")


# --- Sidebar: navigation & collab controls ---
st.sidebar.title("CollabAlign Nav 🤝")

if st.sidebar.button("Welcome"):
    st.session_state.stage = "welcome"
if st.sidebar.button("Personality Test"):
    st.session_state.stage = "test"
if st.sidebar.button("Skills & Passions"):
    st.session_state.stage = "skills"
if st.sidebar.button("Idea Alignment"):
    st.session_state.stage = "ideas"
if st.sidebar.button("Co-Founder Matching"):
    st.session_state.stage = "cofounders"

# Extras
st.sidebar.button(
    "Share Session",
    on_click=lambda: st.sidebar.write(
        f"Share link: https://collabalign.app/{st.session_state.session_id}"
    ),
)

# Career vs business ideas focus
st.session_state.career_focus_mode = st.sidebar.checkbox(
    "Career Focus Mode",
    value=st.session_state.get("career_focus_mode", False),
)

# Progress indicator across stages (supports manual override)
stage_order = ["welcome", "test", "skills", "ideas", "cofounders"]
try:
    current_index = stage_order.index(st.session_state.stage)
except ValueError:
    current_index = 0
auto_progress_value = int((current_index / (len(stage_order) - 1)) * 100) if current_index > 0 else 0
progress_value = (
    st.session_state.progress_override if st.session_state.progress_override else auto_progress_value
)
progress_bar = st.sidebar.progress(0, "Collab Progress")
progress_bar.progress(progress_value, "Collab Progress")

# Reset session
if st.sidebar.button("Reset"):
    st.session_state.clear()
    st.rerun()


# --- Main content by stage ---
if st.session_state.stage == "welcome":
    st.title("CollabAlign: Collaborate on Alignment")
    st.write(
        "Share tests, assess skills/passions, match co-founders, align to ideas/careers with AI. "
        "Mock collab: Invite via share link."
    )
    st.button("Start Collaborative Session", on_click=lambda: setattr(st.session_state, "stage", "test"))

elif st.session_state.stage == "test":
    st.header("Collaborative Personality Test 🎭")
    st.write("Take test, then share for group alignment.")

    with st.form("personality_form"):
        col1, col2 = st.columns(2)
        with col1:
            openness = st.slider("Openness", 1, 5, 3)
            conscientiousness = st.slider("Conscientiousness", 1, 5, 3)
            extraversion = st.slider("Extraversion", 1, 5, 3)
            agreeableness = st.slider("Agreeableness", 1, 5, 3)
            neuroticism = st.slider("Neuroticism", 1, 5, 3)
            physics_vibe = st.slider("Physics Vibe (chaotic systems)", 1, 5, 3)
        with col2:
            econ_vibe = st.slider("Econ Vibe", 1, 5, 3)
            collaboration_pref = st.slider("Collaboration Preference", 1, 5, 3)
            passion_probe = st.slider("Passion Probe (careers)", 1, 5, 3)
            risk_in_teams = st.slider("Risk in Teams", 1, 5, 3)
            ai_adapt = st.slider("AI Adaptability", 1, 5, 3)
            group_dynamics = st.slider("Group Dynamics", 1, 5, 3)

        submitted = st.form_submit_button("Analyze & Continue")

    if submitted:
        # Collect validated responses
        data = {
            "openness": int(openness),
            "conscientiousness": int(conscientiousness),
            "extraversion": int(extraversion),
            "agreeableness": int(agreeableness),
            "neuroticism": int(neuroticism),
            "physics_vibe": int(physics_vibe),
            "econ_vibe": int(econ_vibe),
            "collaboration_preference": int(collaboration_pref),
            "passion_probe_careers": int(passion_probe),
            "risk_in_teams": int(risk_in_teams),
            "ai_adaptability": int(ai_adapt),
            "group_dynamics": int(group_dynamics),
        }

        # Extra validation (sliders already constrain 1..5)
        valid = all(1 <= v <= 5 for v in data.values())
        if not valid:
            st.error("Please keep all answers between 1 and 5.")
        else:
            st.session_state.responses = data
            career = st.session_state.get("career_mode", st.session_state.get("career_focus_mode", False))
            alignment = analyze_personality(data, bool(career))
            st.session_state.alignment = alignment
            # Mock collab add: pass your result into shared_users
            st.session_state.shared_users.append({"user": "You", "alignment": alignment})
            st.success("Test passed—share to collab!")
            # Move to next stage and set manual progress to 25%
            st.session_state.stage = "skills"
            st.session_state.progress_override = 25
            st.rerun()

elif st.session_state.stage == "skills":
    st.header("Skills & Passions Assessment")
    col1, col2 = st.columns(2)
    with col1:
        skills = st.text_area("List core skills (comma-separated)")
        passions = st.text_area("List passions/interests (comma-separated)")
    with col2:
        availability = st.text_input("Weekly availability (hours)")
        strengths = st.text_area("Strengths you want to lean into")
    if st.button("Save Skills/Passions"):
        st.session_state.skills_passions = {
            "skills": [s.strip() for s in skills.split(",") if s.strip()],
            "passions": [p.strip() for p in passions.split(",") if p.strip()],
            "availability": availability.strip(),
            "strengths": strengths.strip(),
        }
        st.success("Saved.")

elif st.session_state.stage == "ideas":
    st.header("Idea Alignment (AI-assisted)")
    st.caption(
        "Mode: "
        + ("Career-focused (resilience, employability)" if st.session_state.career_focus_mode else "Business/Startup ideas")
    )
    context = st.text_area(
        "Context for alignment (skills, passions, constraints)",
        value=str(st.session_state.skills_passions or ""),
        height=120,
    )
    prompt = st.text_area("What do you want to align to? (e.g., climate tech ideas, AI careers)")
    if st.button("Generate Suggestions"):
        try:
            # Simple LLM call (placeholder prompt engineering)
            user_goal = "Career" if st.session_state.career_focus_mode else "Startup/Business"
            messages = [
                ("system", f"You are CollabAlign, an AI for collaborative idea/career alignment."),
                ("user", f"Context: {context}\nGoal type: {user_goal}\nPrompt: {prompt}"),
            ]
            # LangChain ChatOpenAI expects list of dicts or messages; use .invoke with dicts
            response = llm.invoke(
                [
                    {"role": r, "content": c} for r, c in messages
                ]
            )
            content = getattr(response, "content", "") or str(response)
            st.session_state.ideas.append(content)
            st.success("Suggestions generated.")
        except Exception as e:
            st.error(f"LLM error: {e}")

    if st.session_state.ideas:
        st.subheader("Suggestions")
        for idx, idea in enumerate(st.session_state.ideas, start=1):
            st.markdown(f"**Idea {idx}:**\n\n{idea}")

elif st.session_state.stage == "cofounders":
    st.header("Co-Founder Matching (Mock)")
    st.write("Collaboratively shortlist potential co-founders and track conversations.")
    with st.expander("Add a potential co-founder"):
        name = st.text_input("Name")
        email = st.text_input("Email")
        fit_notes = st.text_area("Notes on skill/values fit")
        if st.button("Add to List"):
            st.session_state.cofounders.append({
                "name": name,
                "email": email,
                "notes": fit_notes,
            })
            st.success("Added.")
    if st.session_state.cofounders:
        st.subheader("Shortlist")
        for cf in st.session_state.cofounders:
            st.markdown(f"- **{cf['name']}** ({cf['email']}): {cf['notes']}")


# Footer note
st.caption(
    f"Session: {st.session_state.session_id} | Shared users (mock): "
    f"{len(st.session_state.shared_users)}"
)


