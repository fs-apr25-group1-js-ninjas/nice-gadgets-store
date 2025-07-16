import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ThankYouPage } from '../../ThankYouPage/ThankYouPage';
import { ConfirmationModal } from '../../ConfirmationModal/ConfirmationModal';

import { useCartActionsStore } from '../../../hooks/useCartAndFavorites';

import styles from './CheckoutSection.module.scss';
import type { Product } from '../../../types/product';

type CheckoutSectionProps = {
  productsInCart: (Product & { quantity: number; price: number })[];
};

export const CheckoutSection: FC<CheckoutSectionProps> = ({
  productsInCart,
}) => {
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(0);

  const navigate = useNavigate();
  const clearCart = useCartActionsStore((state) => state.clearCart);

  const totalItems = productsInCart.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const totalPrice = productsInCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    if (showThankYouModal || showConfirmationModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showThankYouModal, showConfirmationModal]);

  const handleCheckoutClick = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmCheckout = () => {
    setShowConfirmationModal(false);

    const randomOrderId = Math.floor(Math.random() * 1000000) + 1;
    setCurrentOrderId(randomOrderId);

    clearCart();

    setShowThankYouModal(true);
  };

  const handleCancelCheckout = () => {
    setShowConfirmationModal(false);
  };

  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
    setCurrentOrderId(0);
    navigate('/');
  };

  return (
    <section className={styles.checkOut}>
      <div className={styles.totalTitlePrice}>
        <h2>${totalPrice}</h2>
      </div>
      <div className={styles.totalTitleItems}>
        <p>Total for {totalItems} items </p>
      </div>
      <hr className={styles.line} />
      <button
        className={styles.checkoutButton}
        onClick={handleCheckoutClick}
      >
        Checkout
      </button>

      <ConfirmationModal
        isOpen={showConfirmationModal}
        message="Checkout is not implemented yet. Do you want to clear the Cart?"
        onConfirm={handleConfirmCheckout}
        onCancel={handleCancelCheckout}
      />

      <ThankYouPage
        isOpen={showThankYouModal}
        onClose={handleCloseThankYouModal}
        orderId={currentOrderId}
      />
    </section>
  );
};
