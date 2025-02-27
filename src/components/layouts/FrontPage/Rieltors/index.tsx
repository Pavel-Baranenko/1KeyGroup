"use client"
import styles from "./index.module.scss"
import React, { useState } from 'react';



export default function Rieltors() {
  const [more, setMore] = useState(false)

  return (
    <>
      <section className={styles.rieltors}>
        <div className="container">
          <h4 className="section-title">Топ-20 риелторов</h4>
          <span className="section__subtitle">
            Рейтинг лучших риелторов платформы на май 2024 год
          </span>
          <div className={`${styles.grid} ${more && styles.open__grid}`}>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Ковалёв Алексей</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>5</div>
                  <div className={styles.feeds}>43 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Зайцева Василиса</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>5</div>
                  <div className={styles.feeds}>32 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Соколов Юрий</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>5</div>
                  <div className={styles.feeds}>21 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Яковлева Ангелина</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.9</div>
                  <div className={styles.feeds}>19 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Воробьёва Владислава</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.9</div>
                  <div className={styles.feeds}>11 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Игорь</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.9</div>
                  <div className={styles.feeds}>8 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Низовец Борис</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.9</div>
                  <div className={styles.feeds}>29 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Морозов Андрей</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.9</div>
                  <div className={styles.feeds}>45 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Гринжин Алексей</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.9</div>
                  <div className={styles.feeds}>10 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Крупина Светлана</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.9</div>
                  <div className={styles.feeds}>23 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Войтов Евгений</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.9</div>
                  <div className={styles.feeds}>12 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Полякова Ирина</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.9</div>
                  <div className={styles.feeds}>9 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Захарова Дарья</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.8</div>
                  <div className={styles.feeds}>29 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Королёва Евгения</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.8</div>
                  <div className={styles.feeds}>8 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Макеев Андрей</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.8</div>
                  <div className={styles.feeds}>21 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Алексеев Андрей</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.8</div>
                  <div className={styles.feeds}>18 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Васильева Анна</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.8</div>
                  <div className={styles.feeds}>48 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Беляев Александр</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.8</div>
                  <div className={styles.feeds}>39 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Баринов Пётр</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.8</div>
                  <div className={styles.feeds}>15 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <img src="./img/static/user.png" alt="" className={styles.img} />
              <div className={styles.wrap}>
                <div className={styles.top}>
                  <div className={styles.name}>Ермаков Александр</div>
                  <div className={styles.verify}></div>
                </div>
                <div className={styles.role}>Риелтор</div>
                <div className={styles.bottom}>
                  <div className={styles.rating}>4.8</div>
                  <div className={styles.feeds}>9 отзывов</div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.more}><span>+ 1 289 риелторов</span></div>
            </div>
          </div>
          {/* {!more && <button className="btn-reset open__more" onClick={() => { setMore(true) }}>
            <span>Открыть ещё</span>
            <img src="./img/static/blue-arrow.svg" alt="" />
          </button>} */}
        </div>
      </section>
    </>
  )
}
