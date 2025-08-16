export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dashboard-container">
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
