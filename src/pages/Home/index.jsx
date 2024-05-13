import React from 'react'
import { Link } from 'react-router-dom'
import exampleImage from '../../assets/work_example.png'
import styles from './index.module.scss'

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.holder}>
        <div className={styles.infoContainer}>
          <div className={styles.infoContainer__leftContainer}>
            <div className={styles.infoContainer__title}>
              Обробка замовлень за допомогою ORDER WISDOM
            </div>
            <div className={styles.infoContainer__description}>
              Керуйте замовленнями від отримання замовлення до кінцевої
              доставки. Покращуйте свої процеси з ORDER WISDOM
            </div>
            <div className={styles.infoContainer__linkContainer}>
              <Link to={'/auth'} className={styles.infoContainer__link}>
                <div className={styles.infoContainer__linkText}>
                  Почніть зараз
                </div>
              </Link>
            </div>
          </div>
          <img
            src={exampleImage}
            alt="img"
            className={styles.infoContainer__image}
          />
        </div>
        <div className={styles.questionContainer}>
          <div className={styles.questionContainer__title}>
            Кому підійде ORDER WISDOM?
          </div>
          <div className={styles.questionContainer__description}>
            Це хмарне програмне забезпечення розроблене для власників
            інтернет-магазинів, яким необхідний повний цикл обробки замовлень в
            єдиному кабінеті.
          </div>
        </div>
        <div className={styles.questionContainer}>
          <div className={styles.questionContainer__title}>
            Користуйтесь OrderWisdom безкоштовно, скільки завгодно
          </div>
          <div className={styles.questionContainer__description}>
            Використовуйте неймовірні можливості нашої платформи стільки,
            скільки це буде необхідно вашому бізнесу. Поліпшити підписку ви
            зможете лише коли поточних ресурсів буде недостатньо.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
