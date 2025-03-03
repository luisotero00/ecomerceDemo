import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import { mobile } from '../responsive';
import { ArrowLeftRounded, ArrowRightRounded } from '@material-ui/icons';
import Loading from '../pages/Loading';
import {
  SearchProducts,
  getAllProducts,
  getProductByTags,
  getProductsFunction,
} from '../utils/endpointsLogic';

const Container = styled.section`
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ alignItems: 'center', justifyContent: 'center' })}
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? '#333' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: 1px solid #ccc;
  padding: 0rem 1rem;
  border-radius: 1rem;
  margin: 0 0.3rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 'bold';

  &:hover {
    background-color: ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.bg};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:focus {
    background-color: ${({ theme }) => theme.bgLighter};
    border: 0.1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
`;
const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.hover};
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  color: ${({ theme }) => theme.bg};
  border: 0.1px solid ${({ theme }) => theme.hover};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
    border: 0.1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
  &:focus {
    background-color: ${({ theme }) => theme.bgLighter};
    border: 0.1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
`;

const Products = ({ tag, filters, sort, query }) => {
  // Estado para almacenar los productos y los productos filtrados
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Estado para controlar la paginación
  const [showPagination, setShowPagination] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  // Función para obtener los productos
  const getProducts = useCallback(async () => {
    const res = await getProductsFunction(currentPage, pageSize, tag, query);
    // Actualiza el estado de los productos y el número total de páginas
    if (res.data.products) {
      setProducts(res.data.products);
    } else if (res.data) {
      setProducts(res.data);
    }
    setTotalPages(res.data.totalPages);
  }, [tag, currentPage, pageSize, query]);

  // Llama a la función getProducts al montar el componente o cuando cambian los parámetros
  useEffect(async () => {
    await getProducts();
  }, [getProducts]);

  // Filtra los productos según los parámetros de filtro y actualiza los productos filtrados
  useEffect(() => {
    if (products.length > 0) {
      if (tag || query) {
        const filtered = filters
          ? products.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
                item[key] ? item[key].includes(value) : false,
              ),
            )
          : products;
        setFilteredProducts(filtered);
        setShowPagination(filtered.length > 8);
      } else {
        setFilteredProducts(products);
        setShowPagination(products.length > 8);
      }
    }
  }, [products, tag, filters, query]);

  // Ordena los productos según el tipo de orden seleccionado (newest, asc, desc)
  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt),
      );
    } else if (sort === 'asc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price),
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price),
      );
    }
  }, [sort]);

  // Maneja el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    // renderiza los productos y si no cargaron, renderiza el componente Loading
    <Container id="Products">
      {products.length > 0 ? (
        <Wrapper>
          {tag || query
            ? filteredProducts.map((product) => (
                <Product
                  product={product}
                  key={product._id}
                  price={product.price}
                />
              ))
            : products.map((product) => (
                <Product
                  product={product}
                  key={product._id}
                  price={product.price}
                />
              ))}
        </Wrapper>
      ) : (
        <Loading />
      )}

      {/* Renderizar paginación */}

      {filteredProducts.length >= 8 && totalPages > 1 ? (
        <PaginationContainer tabIndex="0">
          {/* Botón de página anterior */}
          <Icon
            title="previous"
            aria-label="go to previous page"
            role="navigation"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handlePageChange(currentPage - 1);
              }
            }}
            tabIndex="0"
            style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}
          >
            <ArrowLeftRounded />
          </Icon>
          {/* Botones de número de página */}
          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              title={index + 1}
              role="list"
              aria-label={index + 1}
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
              tabIndex="0"
            >
              {index + 1}
            </PageButton>
          ))}
          {/* Botón de página siguiente */}
          <Icon
            title="next"
            aria-label="go to next page"
            role="navigation"
            onClick={() => handlePageChange(currentPage + 1)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handlePageChange(currentPage + 1);
              }
            }}
            tabIndex="0"
            disabled={currentPage === totalPages}
            style={{
              pointerEvents: currentPage === totalPages ? 'none' : 'auto',
            }}
          >
            <ArrowRightRounded />
          </Icon>
        </PaginationContainer>
      ) : (
        // Renderiza un botón de página anterior si no hay suficientes productos o solo hay una página
        <PaginationContainer
          title="previous"
          aria-label="go to previous page"
          role="navigation"
        >
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handlePageChange(currentPage - 1);
              }
            }}
            tabIndex="0"
          >
            Back
          </PageButton>
        </PaginationContainer>
      )}
    </Container>
  );
};

export default Products;
