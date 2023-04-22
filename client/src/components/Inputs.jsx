import PropTypes from 'prop-types'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Inputs ({ infos, setInfos }) {
  return (
    <div className="inputs">
      <input
        type="text"
        placeholder="Digite seu nome"
        onChange={({ target }) =>
          setInfos({ ...infos, nameUser: target.value })
        }
        value={infos.nameUser}
      />
      <br></br>
      <DatePicker
        placeholderText="Data de entrega"
        selected={infos.delivery}
        onChange={(date) => setInfos({ ...infos, delivery: date })}
        dateFormat="dd/MM/yyyy"
      />
      <h2>O que deseja comprar?</h2>
      <input
        type="text"
        placeholder="Produtos"
        onChange={({ target }) => setInfos({ ...infos, search: target.value })}
        value={infos.search}
      />
    </div>
  )
}

Inputs.propTypes = {
  infos: PropTypes.shape({
    delivery: PropTypes.string,
    nameUser: PropTypes.string,
    search: PropTypes.string
  }),
  setInfos: PropTypes.func
}
