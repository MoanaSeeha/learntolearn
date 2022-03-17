import React, { Component } from 'react';

const initData = {
  pre_heading: "Tests",
  heading: "Test Your Skill",
  btnText: "Sample Test"
}

const data = [
  {
    id: "1",
    img: "/img/auction_1.jpg",
    link: "/basic-math",
    date: "2021-12-09",
    title: "Basic Math",
    seller_thumb: "/img/avatar_1.jpg",
    seller: "@Richard",
    difficulty: "1",
    count: "1 of 1"
  },
  {
    id: "2",
    img: "/img/auction_2.jpg",
    link: "/programming-101",
    date: "2021-10-05",
    title: "Programming 101",
    seller_thumb: "/img/avatar_2.jpg",
    seller: "@JohnDeo",
    difficulty: "2",
    count: "1 of 1"
  },
  {
    id: "3",
    img: "/img/auction_3.jpg",
    link: "/react-101",
    date: "2021-09-15",
    title: "React 101",
    seller_thumb: "/img/avatar_3.jpg",
    seller: "@MKHblots",
    difficulty: "3",
    count: "1 of 1"
  },
  {
    id: "4",
    img: "/img/auction_4.jpg",
    link: "/javascript-101",
    date: "2021-12-29",
    title: "Javascript 101",
    seller_thumb: "/img/avatar_4.jpg",
    seller: "@RioArham",
    difficulty: "2",
    count: "1 of 1"
  },
  // {
  //     id: "5",
  //     img: "/img/auction_5.jpg",
  //     date: "2022-01-24",
  //     title: "Design Illusions",
  //     seller_thumb: "/img/avatar_5.jpg",
  //     seller: "@ArtNox",
  //     difficulty: "1.7 BNB",
  //     count: "1 of 1"
  // },
  // {
  //     id: "6",
  //     img: "/img/auction_6.jpg",
  //     date: "2022-03-30",
  //     title: "Photography",
  //     seller_thumb: "/img/avatar_6.jpg",
  //     seller: "@Junaid",
  //     difficulty: "3.5 BNB",
  //     count: "1 of 1"
  // }
]

class AuctionsOne extends Component {
  state = {
    initData: {},
    data: []
  }
  componentDidMount(){
    this.setState({
      initData: initData,
      data: data
    })
  }
  render() {
    return (
      <section className="test-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <span>{this.state.initData.pre_heading}</span>
                  <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                </div>

              </div>
            </div>
          </div>
          <div className="auctions-slides">
            <div className="swiper-container slider-mid items">
              <div className="swiper-wrapper">
                {/* Single Slide */}
                {this.state.data.map((item, idx) => {
                  return (
                    <div key={`auc_${idx}`} className="swiper-slide item">
                      <div className="card">
                        <div className="image-over">
                          <a href={item.link}>
                            <img className="card-img-top" src={item.img} alt={item.title} />
                          </a>
                        </div>
                        {/* Card Caption */}
                        <div className="card-caption col-12 p-0">
                          {/* Card Body */}
                          <div className="card-body">

                            <a href={item.link}>
                              <h5 className="mb-0">{item.title}</h5>
                            </a>
                            <a className="seller d-flex align-items-center my-3" href={item.link}>
                              <img className="avatar-sm rounded-circle" src={item.seller_thumb} alt={item.title} />

                            </a>
                            <div className="card-bottom d-flex justify-content-between">
                              <span>Difficulty: {item.difficulty}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default AuctionsOne;