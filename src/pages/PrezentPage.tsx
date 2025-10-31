import PageDecorations from "../pages/PrezentsSections/PageDecorations";
import PresentesGrid from "../pages/PrezentsSections/PresentesGrid";
import PageHeaderP from "./PrezentsSections/PageHeaderP";

export default function PresentesPage() {
  return (
    <>
      <PageHeaderP />
      <PageDecorations />
      <PresentesGrid />
    </>
  );
}
