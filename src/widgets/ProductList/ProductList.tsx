import cn from 'classnames'
import { type Product } from '@/entities/product/model/types'
import { ProductCard } from '@/entities/product/ui/ProductCard/ProductCard'
import { selectIsAuthorize } from '@/entities/session/model/slice'
import { AddToWishlist } from '@/features/wishlist/AddToWishlist/ui/AddToWishlist/AddToWishlist'
import { useAppSelector } from '@/shared/model/hooks'
import css from './ProductList.module.css'

type Props = {
  products: Product[]
  isFetching?: boolean
  size?: 's' | 'm'
}

export function ProductList(props: Props) {
  const { isFetching, products, size = 'm' } = props
  const isAuthorized = useAppSelector(selectIsAuthorize)

  if (Boolean(isFetching) && products.length === 0) {
    return <div className={css.root}>Fetching...</div>
  }

  /**
   * ✅ FSD Best practice
   *
   * Receive product actions (add to wishlist)
   * to render-prop to avoid entity cross-import
   */
  return (
    <div className={cn(css.root, css[`root_size_${size}`])}>
      {products.map((product) => (
        <ProductCard
          size={size}
          key={product.id}
          product={product}
          actionSlot={isAuthorized && <AddToWishlist productId={product.id} />}
        />
      ))}
    </div>
  )
}