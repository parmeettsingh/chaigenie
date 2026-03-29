import React from "react";
import PaymentPage from "@/components/PaymentPage";
import { Suspense } from "react";

// Use this to ensure 'menu' doesn't get treated as a user
export async function generateStaticParams() {
  return [];
}

const Username = async ({ params }) => {
  const { username } = await params;

  // If the URL is actually /menu, this component should return null 
  // to let the actual menu/page.js take over.
  if (username === "menu") return null;

  return (
    <Suspense fallback={<div className="pt-32 text-center">Loading Payment...</div>}>
      <PaymentPage username={username} />
    </Suspense>
  );
};

export default Username;