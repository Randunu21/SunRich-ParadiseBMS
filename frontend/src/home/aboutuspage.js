import React from 'react';
import CertifiedImage from '../img/certified.png'

const AboutUsComponent = () => {
  return (
    <div style={{ backgroundColor: '#f2f2f2' }}>
      <div style={{
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        margin: '20px auto'
      }}>
        <h1 style={{
          fontSize: '50px',
          color: '#000',
          marginBottom: '25px',
          position: 'relative'
        }}>About Us</h1>
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '35px'
        }}>Sun Rich Paradise <br />
        Abey Marine (Pvt) Ltd is an eminent and a leading manufacturer, exporter and supplier of Sunrich Paradise Virgin Coconut Oil and other Coconut products from Sri Lanka – the Paradise of the Indian Ocean. </p>
      </div>
      <div style={{
        width: '90%',
        margin: '0 auto',
        padding: '10px 20px'
      }}>
        <section style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{
            flex: '1',
            marginRight: '40px',
            overflow: 'hidden'
          }}>
            <img src="CertifiedImage" style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              transition: '0.5s ease'
            }} />
          </div>
          <div >
            <p style={{
              fontSize: '18px',
              lineHeight: '1.5',
              color: '#666'
            }}>Sun Rich Paradise Virgin Coconut Oil manufacturing facility is advantageously positioned in one of the most prominent areas of Negombo, which is located at the coconut triangle and with easy access to coconut plantations, the Colombo Port, and International Airport, to facilitate exports. <br />
            Sun Rich Paradise Virgin Coconut Oil producer being an international supplier of certified Organic, natural Virgin Coconut Oil and other export-related associated Coconut Products. At Sun Rich Paradise Virgin Coconut Oil factory, we are committed to providing our esteemed customers with prominent quality Coconut products that are healthy and eco-friendly. Apart from marketing our own brand – Sun Rich Paradise Virgin Coconut Oil and Organic Coconut Flour, Natural Coconut Chips, Coconut Milk Organic Desiccated Coconut, we also offer a wide range of additional services such as packing private label as well as shipping in bulk, making opportunities for growth of our partners. <br />
            The factory is approved by the Coconut Development Authority Sri Lanka.</p>
            <a href="" style={{
              display: 'inline-block',
              padding: '10px 20px',
              color: '#fff',
              fontSize: '19px',
              textDecoration: 'none',
              borderRadius: '25px',
              marginTop: '15px',
              transition: '0.3s ease',
              backgroundColor: '#3e8e41'
            }}>Read More</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsComponent;
