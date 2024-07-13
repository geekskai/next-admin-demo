"use client";

import { Suspense, useState } from "react";

// import { fetchData } from './data.js';

import { fetchData } from "./data.js";

// 注意：这个组件使用了一个实验性的 API
// 该 API 并未在 React 的稳定版本中可用

// 在实际的例子中，你可以尝试已经
// 与 Suspense 集成的框架，例如 Relay 或 Next.js。

function Albums({ artistId }: any) {
  const albums = use(fetchData(`/${artistId}/albums`));
  return (
    <ul>
      {albums.map((album: any) => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}

function ArtistPage({ artist }: any) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Albums artistId={artist.id} />
      </Suspense>
    </>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

// 这是一个解决 bug 的临时方案，以便让演示运行起来。
// TODO：当 bug 修复后，用真正的实现替换。
function use(promise: any) {
  if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else if (promise.status === "pending") {
    throw promise;
  } else {
    promise.status = "pending";
    promise.then(
      (result: any) => {
        promise.status = "fulfilled";
        promise.value = result;
      },
      (reason: any) => {
        promise.status = "rejected";
        promise.reason = reason;
      }
    );
    throw promise;
  }
}

export default function Home() {
  const [show, setShow] = useState(false);
  if (show) {
    return (
      <ArtistPage
        artist={{
          id: "the-beatles",
          name: "The Beatles",
        }}
      />
    );
  } else {
    return (
      <button onClick={() => setShow(true)}>
        Open The Beatles artist page
      </button>
    );
  }
}
