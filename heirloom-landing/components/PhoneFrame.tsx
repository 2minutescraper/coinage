export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-shell mx-auto">
      <div className="phone-notch" />
      <div className="phone-screen">{children}</div>
    </div>
  );
}
