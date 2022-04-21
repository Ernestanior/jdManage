import React from "react";
import "./index.less";

export default function index() {
  return (
    <div className="one">
      <div className="con">
        <div className="bearBox">
          <div className="secondBox">
            <div className="moom"></div>
            <svg className="text">
              <defs>
                <linearGradient id="geekColor" gradientTransform="rotate(90)">
                  <stop offset="0%" stopColor="#fff"></stop>
                  <stop offset="10%" stopColor="#fff"></stop>
                  <stop offset="100%" stopColor="#777"></stop>
                </linearGradient>
              </defs>
              <text y="100">安普希</text>
              <text x="0" y="160">
                付姐，主页交给你了
              </text>
            </svg>
            <div className="bg1">
              <div className="bg2">
                <div className="bear"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
