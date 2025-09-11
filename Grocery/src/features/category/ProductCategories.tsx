import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import { Colors } from '@utils/Constants';
import Slidebar from './Slidebar';
import { getAllCategories, getProductsByCategoryId } from '@service/productService';
import ProductList from './ProductList';
import WithCart from '@features/cart/WithCart';

const ProductCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);


 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('[ProductCategories] fetchCategories: START')
        setCategoriesLoading(true);
        const data = await getAllCategories();
        console.log('[ProductCategories] fetchCategories: RESULT', {
          count: Array.isArray(data) ? data.length : undefined,
          sample: Array.isArray(data) ? data[0] : data,
        })
        setCategories(data);
        if (data && data?.length > 0) {
          console.log('[ProductCategories] setting selectedCategory', { _id: data[0]?._id, name: data[0]?.name })
          setSelectedCategory(data[0]);
        }
      } catch (error) {
        console.log('[ProductCategories] fetchCategories: ERROR', {
          message: (error as any)?.message,
        });
      } finally {
        console.log('[ProductCategories] fetchCategories: FINALLY (stop loading)')
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async (categoryId: string ) => {
      try {
        console.log('[ProductCategories] fetchProducts: START', { categoryId })
        setProductsLoading(true);
        const data = await getProductsByCategoryId(categoryId);
        console.log('[ProductCategories] fetchProducts: RESULT', {
          count: Array.isArray(data) ? data.length : undefined,
          sample: Array.isArray(data) ? data[0] : data,
        })
        setProducts(data);
      } catch (error) {
        console.log('[ProductCategories] fetchProducts: ERROR', {
          message: (error as any)?.message,
        });
      } finally {
        console.log('[ProductCategories] fetchProducts: FINALLY (stop loading)')
        setProductsLoading(false);
      }
    }
    if(selectedCategory?._id) {
        console.log('[ProductCategories] selectedCategory changed', { _id: selectedCategory?._id, name: selectedCategory?.name })
        fetchProducts(selectedCategory?._id)
    }
  },[selectedCategory])

   console.log(categories,"categories from backend ");
  console.log(products,"products from backend ");
  console.log(selectedCategory,"selectedCategory from backend ");
  console.log(productsLoading,"productsLoading from backend ");

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={selectedCategory?.name || 'Categories'} search />
      <View style={styles.subContainer}>
        {categoriesLoading ? (
          <ActivityIndicator size="small" color={Colors.border} />
        ) : (
          <Slidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryPress={(category: any) => setSelectedCategory(category)}
          />
        )}
        {productsLoading ? (
          <ActivityIndicator size='large' color={Colors.border} style={styles.center}/>
        ) : (
          <ProductList data={products || []} />
        )}
      </View>
    </View>
  );
};

export default WithCart(ProductCategories);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
