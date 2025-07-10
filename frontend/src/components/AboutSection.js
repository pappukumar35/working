"use client";
import React from "react";

export default function AboutSection() {
  return (
    <section className="bg-indigo-100 py-12 px-6 text-center">
      <h2 className="text-3xl font-bold text-indigo-800 mb-4">
        About CrowdfundIt
      </h2>
      <p className="max-w-3xl mx-auto text-gray-700 text-lg">
        CrowdfundIt is a platform where people can start campaigns to raise funds
        for their dreams, causes, or needs. Whether it’s a startup idea, medical
        emergency, or educational goal — this platform connects you with donors who care.
      </p>
    </section>
  );
}
