"use client";

export default function TodoListLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex justify-end px-6 pt-2">
        <img
          src="/github.svg"
          alt="Github"
          className="cursor-pointer w-6"
          onClick={() => {
            const url = "https://github.com/Tae-Dev/next-todo";
            window.open(url, "_blank", "noopener,noreferrer");
          }}
        />
      </div>
      <div className="p-4 max-w-2xl">{children}</div>
    </>
  );
}
