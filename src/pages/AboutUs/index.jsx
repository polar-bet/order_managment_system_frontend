import React from 'react'
import styles from './index.module.scss'
import { ChatDotsFill, MapFill, Truck } from 'react-bootstrap-icons'
function AboutUs() {
  return (
    <div className={styles.container}>
      <div className={styles.holder}>
        <div className={styles.infoContainer}>
          <h1 className={styles.infoContainer__title}>Про проект</h1>
          <div className={styles.infoContainer__description}>
            Проект "Order Wisdom: Система керування замовленням" призначений для
            створення ефективної платформи, спрямованої на автоматизацію процесу
            управління замовленнями в компанії. Order Wisdom розроблений для
            оптимізації всіх етапів замовницького процесу, від прийняття
            замовлення до його виконання та відправлення клієнту.
          </div>
        </div>
        <div className={styles.infoContainer}>
          <h1 className={styles.infoContainer__title}>
            Можливості додатку <Truck /> <MapFill /> <ChatDotsFill />
          </h1>
          <div className={styles.infoContainer__description}>
            <ul className={styles.infoContainer__list}>
              <li className={styles.infoContainer__listItem}>
                Приймання замовлень: Клієнти можуть розміщувати замовлення через
                веб-сайт або мобільний додаток, де їм надається можливість
                вибору товарів або послуг, вказання кількості, вибору доставки
                та інших параметрів.
              </li>
              <li className={styles.infoContainer__listItem}>
                Обробка замовлень: Система автоматично реєструє отримані
                замовлення та надає можливість персоналу компанії відстежувати
                їх статус, редагувати деталі та планувати виробничі операції.
              </li>
              <li className={styles.infoContainer__listItem}>
                Управління запасами: Order Wisdom дозволяє контролювати рівень
                запасів товарів на складі та автоматично оновлювати їх під час
                прийняття нових замовлень.
              </li>
              <li className={styles.infoContainer__listItem}>
                Аналітика та звітність: Система надає звіти про обсяги продажів,
                динаміку змін замовлень та іншу статистику, яка допомагає
                управлінню приймати обґрунтовані рішення щодо стратегії бізнесу.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
