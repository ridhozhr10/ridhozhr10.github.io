import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
  logoText?: string;
};

export default function BaseLayout({ children, logoText }: Props) {
  return (
    <div id="main-container" className="centralize-container text-center">
      <Header logoText={logoText} />
      <div className="centralize-container items-center m-0">{children}</div>
      <Footer />
    </div>
  );
}
