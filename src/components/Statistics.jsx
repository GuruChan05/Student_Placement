import React from "react";

function Statistics({

  total,

  placed,

  notPlaced,

  average,

  highest,

  percentage

}) {

  const cards = [

    {
      title: "Total Students",
      value: total
    },

    {
      title: "Placed",
      value: placed
    },

    {
      title: "Not Placed",
      value: notPlaced
    },

    {
      title: "Average Package",
      value: `${average.toFixed(2)} LPA`
    },

    {
      title: "Highest Package",
      value: `${highest} LPA`
    },

    {
      title: "Placement Rate",
      value: `${percentage.toFixed(1)}%`
    }

  ];


  return (

    <section>

      <div className="section-heading">

        <div>

          <h2>
            Placement Statistics
          </h2>

          <p>
            Live statistics from student records.
          </p>

        </div>

      </div>


      <div className="stats">

        {cards.map((card) => (

          <div
            className="stat-card"
            key={card.title}
          >

            <p className="stat-label">
              {card.title}
            </p>

            <p className="stat-value">
              {card.value}
            </p>

          </div>

        ))}

      </div>

    </section>

  );

}

export default Statistics;