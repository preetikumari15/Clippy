# 🎬 CLIPPY AI - AI Short Video Generator

An AI-powered web application that automatically generates short videos using:

- AI-generated scripts
- AI images
- Text-to-Speech audio
- Canvas + MediaRecorder video export
- User Authentication
- Database storage for users

Users choose **Topic + Style + Duration**, and the app creates a downloadable short video with synced images and audio.

---

## 🚀 Features

- 🔐 User Sign In / Sign Up (Clerk)
- 👤 User Table & Persistence (Drizzle + Neon DB)
- ✍️ AI Script Generation (scene-wise)
- 🖼 AI Image Generation per scene
- 🔊 Text-to-Speech Audio
- 🎞 Video Preview 
- ⬇️ Export Video (WebM format)

---

## 🛠 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | Next.js, React |
| Styling | Tailwind CSS, shadcn/ui |
| State | React Context API |
| Authentication | Clerk |
| ORM | Drizzle ORM |
| Database | Neon (PostgreSQL) |
| Script AI | Gemini Api |
| Image AI | Hugging Face Stable Diffusion |
| Audio | TTS API |
| Video Export | HTML Canvas + MediaRecorder |
| Storage | LocalStorage + Neon DB |

---


