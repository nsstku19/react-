import React from "react";
import { useState } from "react";

/**
 * Form для добавления клиента с валидацией:
 * - name: обязательное, минимум 2 символа
 * - surname: обязательное, минимум 2 символа
 * - phone: обязательное, шаблон +123(45)1234567 или цифры/знаки, минимум 7 цифр
 *
 * При успешной валидации вызывает handleSubmit(client) и сбрасывает форму.
 */

const initialErrors = {
  name: "",
  surname: "",
  phone: "",
};

const Form = ({ handleSubmit, inClient }) => {
  const [client, setClient] = useState(inClient);
  const [errors, setErrors] = useState(initialErrors);

  const validate = (fieldValues = client) => {
    const temp = { ...errors };

    if ("name" in fieldValues) {
      if (!fieldValues.name || fieldValues.name.trim().length < 2) {
        temp.name = "Имя должно содержать минимум 2 символа";
      } else {
        temp.name = "";
      }
    }

    if ("surname" in fieldValues) {
      if (!fieldValues.surname || fieldValues.surname.trim().length < 2) {
        temp.surname = "Фамилия должна содержать минимум 2 символа";
      } else {
        temp.surname = "";
      }
    }

    if ("phone" in fieldValues) {
      const phone = fieldValues.phone ? fieldValues.phone.trim() : "";
      // простой шаблон: допускаем +, цифры, пробелы, скобки, дефисы; требуем минимум 7 цифр
      const digitsCount = (phone.match(/\d/g) || []).length;
      if (!phone) {
        temp.phone = "Телефон обязателен";
      } else if (digitsCount < 7) {
        temp.phone = "Телефон должен содержать минимум 7 цифр";
      } else {
        temp.phone = "";
      }
    }

    setErrors({
      ...temp,
    });

    // если вызывается проверка всей формы — вернуть true/false
    if (fieldValues === client) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newClient = { ...client, [name]: value };
    setClient(newClient);
    validate({ [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      handleSubmit(client);
      setClient(inClient);
      setErrors(initialErrors);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 8 }}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={client.name}
          onChange={handleChange}
          style={{ display: "block", width: "100%", padding: 6 }}
        />
        {errors.name && (
          <div style={{ color: "red", fontSize: 12 }}>{errors.name}</div>
        )}
      </div>

      <div style={{ marginBottom: 8 }}>
        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          name="surname"
          value={client.surname}
          onChange={handleChange}
          style={{ display: "block", width: "100%", padding: 6 }}
        />
        {errors.surname && (
          <div style={{ color: "red", fontSize: 12 }}>{errors.surname}</div>
        )}
      </div>

      <div style={{ marginBottom: 8 }}>
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          value={client.phone}
          onChange={handleChange}
          style={{ display: "block", width: "100%", padding: 6 }}
          placeholder="+123(45)1234567"
        />
        {errors.phone && (
          <div style={{ color: "red", fontSize: 12 }}>{errors.phone}</div>
        )}
      </div>

      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
