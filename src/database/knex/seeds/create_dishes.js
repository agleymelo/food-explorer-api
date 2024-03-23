/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("dishes").del();
  await knex("dishes").insert([
    {
      name: "Macarons",
      description: "Farinha de amêndoas, manteiga, claras e açúcar.",
      price: 79.97,
      picture: "86e8981491b813136058-mask-group-6.png",
      category: "meal",
    },
    {
      name: "Bolo de damasco",
      description: "Damascos frescos em uma massa sem glúten.",
      price: 19.97,
      picture: "1cd31d771fdc2aa2744a-mask-group-7.png",
      category: "meal",
    },
    {
      name: "Espresso",
      description: "Café cremoso feito na temperatura e pressões perfeitas.",
      price: 15.97,
      picture: "b6b51279b91d1e024e1c-mask-group-9.png",
      category: "beverage",
    },
    {
      name: "Spaguetti Gambe",
      description: "Massa fresca com camarões e pesto.",
      price: 79.97,
      picture: "187eb60d765616268409-mask-group-2.png",
      category: "dessert",
    },
    {
      name: "Salada Ravanello",
      description:
        "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.",
      price: 49.97,
      picture: "acb7378a8c2d8561497a-mask-group.png",
      category: "dessert",
    },
    {
      name: "Torradas de Parma",
      description:
        "Presunto de parma e rúcula em um pão com fermentação natural.",
      price: 25.97,
      picture: "821b727350c128382242-mask-group-1.png",
      category: "dessert",
    },
    {
      name: "Salada Molla",
      description: "Massa fresca com camarões e pesto.",
      price: 79.97,
      picture: "0ea932d886d3359fd45b-mask-group-3.png",
      category: "dessert",
    },
    {
      name: "Prugna Pie",
      description: "Torta de ameixa com massa amanteigada, polvilho em açúcar.",
      price: 79.97,
      picture: "e8c0436ec9c877ae6c4d-mask-group-4.png",
      category: "meal",
    },
    {
      name: "Peachy pastrie",
      description: "Delicioso folheado de pêssego com folhas de hortelã.",
      price: 32.97,
      picture: "c4dbc3bfb9f2554ac636-mask-group-5.png",
      category: "meal",
    },
    {
      name: "Suco de maracujá",
      description: "Suco de maracujá gelado, cremoso, docinho.",
      price: 13.97,
      picture: "0c4d8ba328b55dc1c34d-mask-group-8.png",
      category: "beverage",
    },
    {
      name: "Tè d'autunno",
      description: "Chá de anis, canela e limão. Sinta o outono italiano.",
      price: 19.97,
      picture: "8108eafdb4ec1155f83e-mask-group-10.png",
      category: "beverage",
    },
    {
      name: "Pomo bourbon",
      description: "Maçã, whisky, canela. On the rocks.",
      price: 79.97,
      picture: "8b358a757d90a45bb7dd-mask-group-11.png",
      category: "beverage",
    },
  ]);
};
