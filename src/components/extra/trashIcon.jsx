import React from 'react';

function TrashIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 14V6a2 2 0 012-2h8a2 2 0 012 2v8m-4 0v4m-4-4l1.15-6.86A2 2 0 0111.14 4h1.72a2 2 0 011.99 1.14L15 10h4a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h4z"
      />
    </svg>
  );
}

function TrashIconButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center p-2 text-red-600 rounded-full hover:bg-red-100 focus:outline-none focus:bg-red-100"
    >
      <TrashIcon className="w-6 h-6" />
    </button>
  );
}

export default TrashIconButton;
