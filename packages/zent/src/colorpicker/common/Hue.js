import React, { Component } from 'react';
import reactCSS from '../helpers/reactcss';
import * as hue from '../helpers/hue';

/**
 * 色度条
 */
export default class Hue extends Component {
  componentWillUnmount() {
    this.unbindEventListeners();
  }

  handleChange = (e, skip) => {
    const change = hue.calculateChange(e, skip, this.props, this.refs);
    change && this.props.onChange(change, e);
  };

  handleMouseDown = e => {
    this.handleChange(e, true);
    window.addEventListener('mousemove', this.handleChange);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  handleMouseUp = () => {
    this.unbindEventListeners();
  };

  unbindEventListeners() {
    window.removeEventListener('mousemove', this.handleChange);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const styles = reactCSS(
      {
        default: {
          hue: {
            absolute: '0px 0px 0px 0px',
            background: `linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%,
            #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`,
            borderRadius: this.props.radius,
            boxShadow: this.props.shadow
          },
          container: {
            margin: '0 2px',
            position: 'relative',
            height: '100%'
          },
          pointer: {
            position: 'absolute',
            left: `${this.props.hsl.h * 100 / 360}%`
          },
          slider: {
            marginTop: '1px',
            width: '4px',
            borderRadius: '1px',
            height: '8px',
            boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
            background: '#fff',
            transform: 'translateX(-2px)'
          }
        },
        vertical: {
          hue: {
            background: `linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
            #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`
          },
          pointer: {
            left: '0px',
            top: `${-(this.props.hsl.h * 100 / 360) + 100}%`
          }
        }
      },
      { vertical: this.props.direction === 'vertical' }
    );

    return (
      <div style={styles.hue} className="hue-area">
        <div
          className="hue-bar"
          style={styles.container}
          ref={ref => (this.refs = ref)}
          onMouseDown={this.handleMouseDown}
          onTouchMove={this.handleChange}
          onTouchStart={this.handleChange}
        >
          <div style={styles.pointer}>
            {this.props.pointer ? (
              <this.props.pointer {...this.props} />
            ) : (
              <div style={styles.slider} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
