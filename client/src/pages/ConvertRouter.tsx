import { useRoute } from "wouter";
import { converterCategories } from "@/lib/converter-data";
import ConverterCategoryPage from "./ConverterCategoryPage";
import ConverterPage from "./ConverterPage";

export default function ConvertRouter() {
  const [, params] = useRoute("/convert/:slug");
  const slug = params?.slug || "";
  const isCategory = converterCategories.some(c => c.slug === slug);

  if (isCategory) return <ConverterCategoryPage />;
  return <ConverterPage />;
}
