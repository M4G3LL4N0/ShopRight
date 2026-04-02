import { Button } from "../ui/Button";
import { GlassCard } from "../ui/GlassCard";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Smarter Shopping,<br />
              Powered by AI
            </h1>
            <p className="text-xl text-muted-foreground">
              Scan any product, menu, or shelf to get instant recommendations,
              price comparisons, and personalized insights.
            </p>
            <div className="flex gap-4">
              <Button size="lg">
                Start Scanning
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative">
            <GlassCard className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap