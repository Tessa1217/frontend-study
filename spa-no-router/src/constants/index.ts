/** API URL */
export const API_BASE_URL: string = import.meta.env.VITE_APP_SERVER_URL;

/** News Category */
type NEWS_CATEGORY = {
  value: string;
  title: string;
};

export const NEWS_CATEGORY_LIST: NEWS_CATEGORY[] = [
  { value: "", title: "전체" },
  { value: "Society", title: "사회/시사" },
  { value: "Politics", title: "정치" },
  { value: "Business", title: "경제" },
  { value: "Tech", title: "테그" },
  { value: "Sports", title: "스포츠" },
  { value: "Entertainment", title: "연예" },
  { value: "Living", title: "생활" },
];
