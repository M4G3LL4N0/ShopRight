import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 18% 12%, rgba(66,104,255,0.28), transparent 24%), radial-gradient(circle at 78% 14%, rgba(50,215,255,0.16), transparent 22%), linear-gradient(180deg, #07101f 0%, #050816 52%, #04070f 100%)",
          color: "#f7f9ff",
          padding: "64px",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        },
      },
      [
        React.createElement(
          "div",
          {
            key: "top",
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            },
          },
          [
            React.createElement(
              "div",
              {
                key: "badge",
                style: {
                  display: "flex",
                  width: "fit-content",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.08)",
                  fontSize: "18px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.72)",
                },
              },
              "ShopRight"
            ),
            React.createElement(
              "div",
              {
                key: "title",
                style: {
                  display: "flex",
                  flexDirection: "column",
                  fontSize: 72,
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                  maxWidth: "900px",
                },
              },
              [
                React.createElement(
                  "span",
                  { key: "line1" },
                  "Decide what is worth buying"
                ),
                React.createElement(
                  "span",
                  {
                    key: "line2",
                    style: {
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #d9e2ff 34%, #8bb0ff 72%, #74edff 100%)",
                      color: "transparent",
                    },
                  },
                  "before you buy it."
                ),
              ]
            ),
            React.createElement(
              "div",
              {
                key: "sub",
                style: {
                  display: "flex",
                  fontSize: "28px",
                  lineHeight: 1.4,
                  color: "rgba(235,240,255,0.72)",
                  maxWidth: "960px",
                },
              },
              "Camera-first purchase intelligence for menus, drinks, shelves, and real-world shopping decisions."
            ),
          ]
        ),
        React.createElement(
          "div",
          {
            key: "bottom",
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "24px",
            },
          },
          [
            React.createElement(
              "div",
              {
                key: "metrics",
                style: {
                  display: "flex",
                  gap: "18px",
                },
              },
              [
                "Best Overall",
                "Best Value",
                "Safe Pick",
                "Adventurous Pick",
              ].map((label) =>
                React.createElement(
                  "div",
                  {
                    key: label,
                    style: {
                      display: "flex",
                      padding: "14px 18px",
                      borderRadius: "18px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.06)",
                      fontSize: "20px",
                      color: "rgba(255,255,255,0.82)",
                    },
                  },
                  label
                )
              )
            ),
            React.createElement(
              "div",
              {
                key: "brand",
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "8px",
                },
              },
              [
                React.createElement(
                  "div",
                  {
                    key: "brand-name",
                    style: {
                      fontSize: "28px",
                      fontWeight: 600,
                    },
                  },
                  "ShopRight"
                ),
                React.createElement(
                  "div",
                  {
                    key: "brand-tag",
                    style: {
                      fontSize: "18px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.45)",
                    },
                  },
                  "Purchase Intelligence"
                ),
              ]
            ),
          ]
        ),
      ]
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
