# A-Frame Raycaster Follow Component

![](https://rawcdn.githack.com/EberlyODL/vr/af15ed8fc3e82376c1a2583ebbfccb9f0ffb5ffd/elements/aframe-raycaster-follower-component/assets/demo.gif)

This is an A-Frame component for changing the position of an object based on what your raycasting is interacting with.  Useful for raycaster indicators.

## Installation

```
npm install @odl/aframe-raycaster-follower-component
```

## API

### Properties
| Property  | Type | Description  | Default Value | Values  |
|-----------|------|--------------|---------------|---------|
| targets | String | Comma separated list of CSS selectors for that the element should follow when interacted upon by the raycaster | | ex: 'a-box,a-sphere,.trangle'
| offset | vec3 | Vector 3 based coordinates for the relative offset of the follower element's position in relation to the target's position | 0 0 0 | ex: '0 -3 1' |

## Usage

To use this component you need three things:

- Target to follower
- A follower entity with `raycaster-follower`
- A raycaster

```
  <!-- target -->
  <a-entity class="target" position="3 3 3"></a-entity>

  <!-- follower -->
  <a-entity raycaster-follower="target:.target;offset: 0 -3 0;">

  <!-- Raycaster -->
  <a-camera>
    <a-cursor></a-cursor>
  </a-camera>
```

Demo of two raycaster collision indicators:

```
<head>
  <title>A-Frame Raycaster Follower Component</title>
  <script src="https://unpkg.com/aframe"></script>
  <script src="https://unpkg.com/aframe-animation-component@^4.1.2/dist/aframe-animation-component.min.js"></script> 
  <!-- raycaster follower -->
  <script src="https://unpkg.com/@odl/aframe-raycaster-follower-component"></script>
</head>

<body>
  <a-scene>

    <a-box material="color: pink" position="0 3 -18"></a-box>
    <a-box material="color: orange" position="5 2 -8"></a-box>
    <a-box material="color: purple" position="-5 -1 -4"></a-box>

    <a-cylinder material="color: pink" position="2 7 -18"></a-cylinder>
    <a-cylinder material="color: orange" position="9 3 -8"></a-cylinder>
    <a-cylinder material="color: purple" position="-7 -8 -4"></a-cylinder>

    <a-entity position="0 3 -3" raycaster-follower="targets:a-box;offset:0 -2 0">
      <a-entity id="indicator-1" geometry="primitive:octahedron;radius:0.73" material="color:#0050ff;width:500"></a-entity>
    </a-entity>

    <a-entity position="0 3 -3" scale=".7 .7 .7" raycaster-follower="targets:a-cylinder;offset:0 -2 0">
      <a-entity
        id="indicator-2"
        geometry="primitive:octahedron;radius:0.73"
        material="color:#bd1f4f;width:300"
        animation="property: position; dir: alternate; dur: 500;
        easing: easeInSine; loop: true; to: 0 2.5 0"
        animation__rotation="property: rotation; dir: forward; dur: 3300;
        easing: linear; loop: true; to: 0 360 0"
        ></a-entity>
    </a-entity>

    <a-camera>
      <a-cursor></a-cursor>
    </a-camera>

  </a-scene>
</body>
```