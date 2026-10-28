---
title: Facility
path: /specification/data/facility/
---

<h2>Primary Key</h2>
<p>
  <code>id</code>
</p>
<h2>Columns</h2>
<table>
  <colgroup>
    <col width="20%"/>
    <col width="65%"/>
    <col width="15%"/>
  </colgroup>
  <thead>
    <tr>
      <th>Name</th>
      <th>Definition</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td id="id">
        <code>
          <strong>id</strong>
        </code>
      </td>
      <td>
        <p>Unique identifier of the facility</p>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="type">
        <code>
          <strong>type</strong>
        </code>
      </td>
      <td>
        <p>Kind of facility: showroom (sales site where cars are displayed, indoor or open-air), service (servicing, mechanical and body repair), warehouse (storage of stock not on display), delivery (handover or pick-up point), office (administrative site with no cars on site)</p>
        <strong>Constraints</strong>
        <ul>
          <li>
            enum: 
            <code>showroom, service, warehouse, delivery, office</code>
          </li>
        </ul>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="title">
        <code>
          <strong>title</strong>
        </code>
      </td>
      <td>
        <p>The name of the facility</p>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="country">
        <code>
          <strong>country</strong>
        </code>
      </td>
      <td>
        <p>Country where the facility is located</p>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="region">
        <code>
          <strong>region</strong>
        </code>
      </td>
      <td>
        <p>State or region within the country</p>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="city">
        <code>
          <strong>city</strong>
        </code>
      </td>
      <td>
        <p>Closest city where the facility is located</p>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="address">
        <code>
          <strong>address</strong>
        </code>
      </td>
      <td>
        <p>Street address of the facility</p>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="postcode">
        <code>
          <strong>postcode?</strong>
        </code>
      </td>
      <td>
        <p>Postal code of the facility location</p>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="phone">
        <code>
          <strong>phone?</strong>
        </code>
      </td>
      <td>
        <p>Contact phone number for the facility</p>
      </td>
      <td>
        <code>string</code>
      </td>
    </tr>
    <tr>
      <td id="email">
        <code>
          <strong>email?</strong>
        </code>
      </td>
      <td>
        <p>Contact email address for the facility</p>
      </td>
      <td>
        <code>email</code>
      </td>
    </tr>
    <tr>
      <td id="url">
        <code>
          <strong>url?</strong>
        </code>
      </td>
      <td>
        <p>URL to the facility</p>
      </td>
      <td>
        <code>url</code>
      </td>
    </tr>
    <tr>
      <td id="lon">
        <code>
          <strong>lon?</strong>
        </code>
      </td>
      <td>
        <p>Longitude coordinate of the facility location</p>
      </td>
      <td>
        <code>number</code>
      </td>
    </tr>
    <tr>
      <td id="lat">
        <code>
          <strong>lat?</strong>
        </code>
      </td>
      <td>
        <p>Latitude coordinate of the facility location</p>
      </td>
      <td>
        <code>number</code>
      </td>
    </tr>
  </tbody>
</table>

<h2>Facility types</h2>
<table>
  <thead>
    <tr>
      <th>Value</th>
      <th>Meaning</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>showroom</code></td><td>Sales site where cars are displayed, indoor or open-air</td></tr>
    <tr><td><code>service</code></td><td>Servicing, mechanical and body repair</td></tr>
    <tr><td><code>warehouse</code></td><td>Storage of stock not on display</td></tr>
    <tr><td><code>delivery</code></td><td>Handover or pick-up point</td></tr>
    <tr><td><code>office</code></td><td>Administrative site with no cars on site</td></tr>
  </tbody>
</table>
<h2>Migrating from showroom</h2>
<p>
  The <code>showroom</code> table is replaced by <code>facility</code>. To migrate, rename the
  resource from <code>showroom</code> to <code>facility</code>, rename the car column
  <code>showroomId</code> to <code>facilityId</code>, and add <code>type: "showroom"</code> to every
  existing row. An old <code>showroomId</code> key on a car still validates, because unknown keys are
  allowed, but it is no longer the foreign key: only <code>facilityId</code> is.
</p>
