import styles from '@/styles/panel/Card.module.css'

function Card(props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{props.title}</h3>
      </div>
      <div className={styles.content}>
        {props.children}
        <hr />
        <div>
          <h4>مدرس : خالق کریمی</h4>
          <h4>از 1401/01/01 الی 1401/02/01</h4>
          <h4>سه شنبه از 14:00 الی 16:00</h4>
          <h4>چهار شنبه از 14:00 الی 16:00</h4>
        </div>
        <button href="#" className={styles.button}>شرکت در دوره</button>
      </div>
    </div>
  )
}

export default Card