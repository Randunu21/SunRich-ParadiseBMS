import React from "react";

const OrderHome = () => {
  return (
    <div class="row row-cols-1 row-cols-md-3 g-4 container-sm">
      <div class="col">
        <a href="/pending-orders">
          <div class="card h-100">
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Pending Order</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </a>
      </div>
      <div class="col">
        <a href="/ongoing-orders">
          <div class="card h-100">
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Ongoing Orders</h5>
              <p class="card-text">This is a short card.</p>
            </div>
          </div>
        </a>
      </div>
      <div class="col">
        <a href="/past-orders">
          <div class="card h-100">
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Completed Orders</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content.
              </p>
            </div>
          </div>
        </a>
      </div>
      <div class="col">
        <a>
          <div class="card h-100">
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default OrderHome;
