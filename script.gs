function adicionarFeriadosNoCalendar() {
  // Defina o calendário de destino. Aqui usamos o calendário padrão do usuário.
  var calendar = CalendarApp.getDefaultCalendar();
  
  // Ano para os feriados nacionais (os dados não incluem o ano)
  var anoNacional = 2025;
  
  // Lista de feriados nacionais
  var feriadosNacionais = [
    { data: "01 de janeiro", diaSemana: "quarta-feira", feriado: "Confraternização Universal" },
    { data: "03 de março", diaSemana: "segunda-feira", feriado: "Carnaval" },
    { data: "04 de março", diaSemana: "terça-feira", feriado: "Carnaval" },
    { data: "18 de abril", diaSemana: "sexta-feira", feriado: "Sexta-Feira da Paixão" },
    { data: "21 de abril", diaSemana: "segunda-feira", feriado: "Dia de Tiradentes" },
    { data: "01 de maio", diaSemana: "quinta-feira", feriado: "Dia do Trabalhador" },
    { data: "19 de junho", diaSemana: "quinta-feira", feriado: "Corpus Christi" },
    { data: "07 de setembro", diaSemana: "domingo", feriado: "Independência do Brasil" },
    { data: "12 de outubro", diaSemana: "domingo", feriado: "Dia de Nossa Senhora Aparecida" },
    { data: "02 de novembro", diaSemana: "domingo", feriado: "Dia de Finados" },
    { data: "15 de novembro", diaSemana: "sábado", feriado: "Proclamação da República do Brasil" },
    { data: "20 de novembro", diaSemana: "quinta-feira", feriado: "Dia da Consciência Negra" },
    { data: "25 de dezembro", diaSemana: "quinta-feira", feriado: "Natal" },
    { data: "05 de março", diaSemana: "quarta-feira", feriado: "Quarta-Feira de Cinzas" },
    { data: "31 de dezembro", diaSemana: "quarta-feira", feriado: "Último dia útil do ano (Não haverá expediente ao público)" }
  ];
  
  // Lista de feriados municipais
  var feriadosMunicipais = [
    { data: "23/04/2025 quarta-feira", uf: "RJ", municipio: "RIO DE JANEIRO", tipo_feriado: "Permanente" },
    { data: "20/11/2025 quinta-feira", uf: "RJ", municipio: "RIO DE JANEIRO", tipo_feriado: "Permanente" },
    { data: "20/01/2026 terça-feira", uf: "RJ", municipio: "RIO DE JANEIRO", tipo_feriado: "Permanente" }
  ];
  
  // Função para converter data dos feriados nacionais ("DD de Mês") em objeto Date.
  function parseDataNacional(dataStr, ano) {
    // Exemplo: "01 de janeiro"
    var partes = dataStr.split(" de ");
    var dia = parseInt(partes[0]);
    var mesNome = partes[1].trim().toLowerCase();
    var meses = {
      "janeiro": 0,
      "fevereiro": 1,
      "março": 2,
      "abril": 3,
      "maio": 4,
      "junho": 5,
      "julho": 6,
      "agosto": 7,
      "setembro": 8,
      "outubro": 9,
      "novembro": 10,
      "dezembro": 11
    };
    var mes = meses[mesNome];
    return new Date(ano, mes, dia);
  }
  
  // Função para converter data dos feriados municipais ("dd/mm/aaaa ...") em objeto Date.
  function parseDataMunicipal(dataStr) {
    // Exemplo: "23/04/2025 quarta-feira"
    // Separamos pela parte da data (primeiros 10 caracteres)
    var dataPart = dataStr.substring(0, 10);
    var partes = dataPart.split("/");
    var dia = parseInt(partes[0]);
    var mes = parseInt(partes[1]) - 1; // mês em JavaScript inicia em 0
    var ano = parseInt(partes[2]);
    return new Date(ano, mes, dia);
  }
  
  // Adiciona os feriados nacionais
  feriadosNacionais.forEach(function(feriado) {
    var dataEvento = parseDataNacional(feriado.data, anoNacional);
    // Cria um evento de dia inteiro
    calendar.createAllDayEvent(feriado.feriado, dataEvento);
    Logger.log("Adicionado feriado nacional: " + feriado.feriado + " em " + dataEvento);
  });
  
  // Adiciona os feriados municipais
  feriadosMunicipais.forEach(function(feriado) {
    var dataEvento = parseDataMunicipal(feriado.data);
    // Criamos o título combinando informações
    var titulo = feriado.municipio + " - " + feriado.tipo_feriado;
    // Caso queira incluir a data original ou outra informação, você pode ajustar o título ou descrição.
    calendar.createAllDayEvent(titulo, dataEvento, {description: "Feriado Municipal: " + feriado.data});
    Logger.log("Adicionado feriado municipal: " + titulo + " em " + dataEvento);
  });
  
  Logger.log("Todos os feriados foram adicionados ao calendário.");
}
