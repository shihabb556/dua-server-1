import { Dua } from "./dua.types";


export interface Category {
    id: number;
    cat_id: number;
    cat_name_bn: string;
    cat_name_en: string;
    no_of_subcat: number;
    no_of_dua: number;
    cat_icon: string;
  }

  export interface SubCategory {
   id: number;
   name_bn: string;
   name_en: string;
   duas: Dua[];
}

export interface CategoryWithSubcategories {
  id: number;
  name_bn: string;
  name_en: string;
  subcategories: SubCategory[];
}

export interface JoinedRow {
  category_id: number;
  cat_name_bn: string;
  cat_name_en: string;

  subcat_id: number;
  subcat_name_bn: string;
  subcat_name_en: string;

  dua_id: number | null;
  dua_cat_id: number | null;
  dua_subcat_id: number | null;
  dua_number: number | null;
  dua_name_bn: string | null;
  dua_name_en: string | null;
  top_bn: string | null;
  top_en: string | null;
  dua_arabic: string | null;
  dua_indopak: string | null;
  clean_arabic: string | null;
  transliteration_bn: string | null;
  transliteration_en: string | null;
  translation_bn: string | null;
  translation_en: string | null;
  bottom_bn: string | null;
  bottom_en: string | null;
  refference_bn: string | null;
  refference_en: string | null;
  audio: string | null;
}
