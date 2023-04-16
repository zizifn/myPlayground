import React, { Suspense } from "react";
import { SearchableRepo } from "./searchable-repo";

export const metadata = {
  title: "client search demo",
  description: "trash app by zizifn",
};

type Repo = {
  name: string;
};

export default function ClientSearch() {
  return (
    <>
      <h2 className="h-10 text-xl text-cyan-400">client search demo</h2>
      <Suspense fallback={<div>loading repo...</div>}>
        <Repos></Repos>
      </Suspense>
    </>
  );
}

async function Repos() {
  const repoRsp = await fetch("https://api.github.com/users/zizifn/repos", {
    headers: {
      Authorization:
        "Bearer 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",
    },
  });
  console.log(repoRsp.ok);
  if (!repoRsp.ok) {
    return <div>failed to fetch repos</div>;
  }
  const repos: Repo[] = await repoRsp.json();

  sleep(2000);
  // tailwind font size
  return (
    <>
      <div>totoal repo {repos.length}</div>
      <Suspense fallback={<div>loading search...</div>}>
        <SearchableRepo repos={repos}></SearchableRepo>
      </Suspense>
    </>
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
