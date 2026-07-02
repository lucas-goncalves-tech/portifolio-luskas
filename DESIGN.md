---
name: Pentester Portfolio
colors:
  primary: "#050505"
  secondary: "#111111"
  tertiary: "#FF2A2A"
  text-main: "#F0F0F0"
  text-muted: "#888888"
  border: "#333333"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(3rem, 8vw, 8rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "14px"
    fontWeight: 400
    letterSpacing: "0.05em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
---

# Pentester Portfolio

## Overview
A brutalist, high-contrast portfolio for a penetration tester. Evokes authority, technical mastery, and a "Red Team" aesthetic. No cheap hacker cliches (no matrix green). Uses Void Black, Signal Red, and sharp edges.

## Colors
- **Void Black (#050505):** Deep space background for zero distractions.
- **Signal Red (#FF2A2A):** The accent. Represents breaches, alerts, and Red Team operations.
- **Terminal Gray (#888888):** For secondary text and structural borders.

## Typography
- **Display (Space Grotesk):** Massive, tight, and geometric for hero statements.
- **Mono (JetBrains Mono):** For technical details, stats, and small labels.
- **Body (Inter):** Clean readability for paragraphs.

## Layout & Shapes
- **Asymmetric & Brutalist:** Heavy reliance on typography, overlapping elements, and sharp corners (0px to 2px max). No soft friendly radii.

## Do's and Don'ts
- Do use Signal Red sparingly for the highest priority actions or keywords.
- Don't use purple, blue, or soft rounded corners.
- Do keep borders visible and sharp (1px solid #333333) to create a structured, terminal-like grid feel.
- Don't use standard split-screen layouts. Fragment the content.
