"use client";
import { useActionState, useState } from "react";
import Layout from "../components/layout";
import { createPostForm } from "../lib/PostActions";
import Head from "next/head";

const initialState = {
  message: null,
  errors: {
    key: "",
    title: "",
    content: "",
  },
  values: {
    key: "",
    title: "",
    content: ""
  }
};
export default function Page() {
  const [state, formAction, pending] = useActionState(
    createPostForm,
    initialState
  );
  return (
    <Layout>
      <Head>
        <title>Create Post</title>
      </Head>
      <h4>Create Post</h4>
      <form action={formAction} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {state?.errors?.title && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {state.errors.title}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="key"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Key
          </label>
          <input
            type="text"
            id="key"
            name="key"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {state?.errors?.key && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {state.errors.key}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
          </textarea>
          {state?.errors?.content && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {state.errors.content}
            </p>
          )}
        </div>
        {state?.message && (
          <p
            aria-live="polite"
            className="mt-2 text-sm text-red-600 dark:text-red-500"
          >
            {state.message}
          </p>
        )}
        {state?.errors &&
          Object.keys(state.errors).map((key) => (
            <p
              key={key}
              aria-live="polite"
              className="mt-2 text-sm text-red-600 dark:text-red-500"
            >
              {state.errors[key]}
            </p>
          ))}
        <button
          type="submit"
          disabled={pending}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
      </form>
    </Layout>
  );
}
