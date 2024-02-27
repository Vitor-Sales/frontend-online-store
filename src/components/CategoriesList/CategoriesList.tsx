import React, { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
}

function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
        const categoriesData: Category[] = await response.json();
        setCategoriesList(categoriesData);
      } catch (error) {
        console.error('Erro ao obter categorias:', error);
      }
    };

    if (categoriesList.length === 0) {
      fetchCategories();
    }
  }, [categoriesList]);

  const handleCategoryClick = (categoryId: string) => {
    console.log('Categoria clicada:', categoryId);
  };

  return (
    <div>
      {categoriesList.map((category) => (
        <button
          key={ category.id }
          onClick={ () => handleCategoryClick(category.id) }
          data-testid="category"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default CategoriesList;
