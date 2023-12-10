import React from "react";
import CSmButton from "../../../components/form/CSmButton";
import DestinationCard from "./components/DestinationCard";
import ReviewCard from "./components/ReviewCard";

const Home = () => {
  const changeHandler = event => {};

  return (
    <div className='home'>
      <div className='home__intro'>
        <img
          src={require("../../../assets/flyingPlane.png")}
          alt=''
          className='home__intro--bg'
        />

        <div className='home__intro__content'>
          <h2>Ready to Fly? We have got great flight deals!</h2>
          <div className='home__intro__content__box'>
            <div className='home__intro__content__box__upper'>
              <div className='home__intro__content__box__upper__input'>
                <label htmlFor='from'>From</label>
                <input
                  type='text'
                  name='from'
                  id='from'
                  onChange={changeHandler}
                  placeholder='Dehli'
                />
              </div>
              <div className='home__intro__content__box__upper__input'>
                <label htmlFor='to'>To</label>
                <input
                  type='text'
                  name='to'
                  id='to'
                  onChange={changeHandler}
                  placeholder='Washington'
                />
              </div>
              <div className='home__intro__content__box__upper__input'>
                <label htmlFor='date'>Date</label>
                <input
                  type='text'
                  name='date'
                  id='date'
                  onChange={changeHandler}
                  placeholder='Add Date'
                />
              </div>
              <div className='home__intro__content__box__upper__input'>
                <label htmlFor='class'>Cabin Class</label>
                <input
                  type='text'
                  name='class'
                  id='class'
                  onChange={changeHandler}
                  placeholder='Economy'
                />
              </div>
            </div>
            <div className='home__intro__content__box__lower'>
              <CSmButton title='Search' icon='fa-solid fa-magnifying-glass' />
            </div>
          </div>
        </div>

        <div className='home__intro__scrollBtn'>
          <div className='home__intro__scrollBtn__clickable'>
            <h3>Scroll Now</h3>
            <span>
              Other travelers are loving these destinations. Scroll down to see
              more!
            </span>
            <img src={require("../../../assets/scroll.png")} alt='' />
          </div>
        </div>
      </div>
      <div className='home__popularDestinations'>
        <h2>Popular Destinations</h2>
        <div className='home__popularDestinations__dests'>
          <DestinationCard
            image='https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RGVobGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
            destination='Dehli, India'
            price='$500'
          />
          <DestinationCard
            image='https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fG5ldyUyMHlvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
            destination='New York, US'
            price='$500'
          />
          <DestinationCard
            image='https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGFyaXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
            destination='Paris, France'
            price='$500'
          />
          <DestinationCard
            image='https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXN0YW5idWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
            destination='Istanbul, Turkey'
            price='$500'
          />
        </div>
      </div>

      <div className='home__reviews'>
        <h2>We care about about customers</h2>
        <div className='home__reviews__reviews'>
          <ReviewCard
            image='https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fGdpcmwlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
            name='Jassica'
            rating={5}
            review='        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam illo,
        veniam obcaecati voluptatibus quod voluptatem delectus. Ratione
        explicabo maxime numquam, qui soluta eligendi nisi quas?'
          />
          <ReviewCard
            image='https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ4fHxtYW4lMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
            name='Adam'
            rating={5}
            review='        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam illo,
        veniam obcaecati voluptatibus quod voluptatem delectus. Ratione
        explicabo maxime numquam, qui soluta eligendi nisi quas?'
          />
          <ReviewCard
            image='https://plus.unsplash.com/premium_photo-1691784781482-9af9bce05096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxnaXJsJTIwYXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
            name='Sara'
            rating={5}
            review='        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam illo,
        veniam obcaecati voluptatibus quod voluptatem delectus. Ratione
        explicabo maxime numquam, qui soluta eligendi nisi quas?'
          />
          <ReviewCard
            image='https://images.unsplash.com/photo-1517810095498-0f282469aba9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE3fHxib3klMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
            name='Smith'
            rating={5}
            review='        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam illo,
        veniam obcaecati voluptatibus quod voluptatem delectus. Ratione
        explicabo maxime numquam, qui soluta eligendi nisi quas?'
          />
          <ReviewCard
            image='https://images.unsplash.com/photo-1593839686924-4b344fac3f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGFkdWx0JTIwYXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
            name='David'
            rating={5}
            review='        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam illo,
        veniam obcaecati voluptatibus quod voluptatem delectus. Ratione
        explicabo maxime numquam, qui soluta eligendi nisi quas?'
          />
          <ReviewCard
            image='https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fHdvbWFuJTIwYXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
            name='Chloe'
            rating={5}
            review='        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam illo,
        veniam obcaecati voluptatibus quod voluptatem delectus. Ratione
        explicabo maxime numquam, qui soluta eligendi nisi quas?'
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
