export const priority = [
  { value: 4, label: "Çok Öncelikli" },
  {
    value: 3,
    label: "Öncelikli",
  },
  {
    value: 2,
    label: "Normal",
  },
  {
    value: 1,
    label: "Düşük",
  },
  {
    value: 0,
    label: "Çok Düşük",
  },
];

export const category = [
  {
    label: "Gıda",
    value: "A",
  },
  {
    label: "Barınma",
    value: "C",
  },
  {
    label: "Sağlık",
    value: "F",
  },
  {
    label: "Çocuk",
    value: "D",
  },
  {
    label: "Kadın",
    value: "E",
  },
  {
    label: "Elektronik",
    value: "E",
  },
  {
    label: "Giyim",
    value: "B",
  },
  {
    label: "Diğer",
    value: "G",
  },
];

export const getCategory = (value) => {
  const cat = category.filter((item) => item.value == value);
  return cat[0].label;
};

export const getPriority = (value) => {
  switch (value) {
    case 4:
      return "Çok Öncelikli";
    case 3:
      return "Öncelikli";
    case 2:
      return "Normal";
    case 1:
      return "Düşük";
    case 0:
      return "Çok Düşük";
    default:
      return "Normal";
  }
};
