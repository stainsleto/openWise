export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <section className="border p-4">
      <h1 className="text-xl border-b pb-2">{title}</h1>
      <div>{children}</div>
    </section>
  );
}
