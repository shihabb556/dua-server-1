

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
    cat_id: number;
    subcat_id: number;
    subcat_name_bn: string;
    subcat_name_en: string;
    no_of_dua: number;
  }