# Weather Dashboard 🌤️

Um dashboard de clima interativo que busca dados em tempo real de uma API pública de clima.

## Características

✅ **Busca de Cidades** - Digite o nome de qualquer cidade do mundo
✅ **Dados em Tempo Real** - Temperatura, umidade, pressão, velocidade do vento
✅ **Previsão de 5 Dias** - Veja a previsão para os próximos 5 dias
✅ **Design Responsivo** - Funciona perfeitamente em desktop e mobile
✅ **Interface Intuitiva** - Fácil de usar com ícones e cores visuais
✅ **Carregamento Automático** - Carrega dados de São Paulo ao iniciar

## Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Design moderno com gradientes e animações
- **JavaScript (Vanilla)** - Lógica e integração com API
- **OpenWeatherMap API** - Dados meteorológicos em tempo real

## Como Usar

1. **Abra o arquivo `index.html`** no navegador
2. **Digite o nome de uma cidade** no campo de busca
3. **Clique em "Buscar"** ou pressione Enter
4. **Visualize as informações climáticas** em tempo real

## Dados Exibidos

### Clima Atual
- Temperatura
- Sensação térmica
- Descrição do clima (céu limpo, nublado, chuva, etc.)
- Umidade (%)
- Pressão (hPa)
- Velocidade do vento (km/h)
- Nebulosidade (%)
- Visibilidade (km)

### Previsão de 5 Dias
- Data
- Temperatura média, mínima e máxima
- Descrição do clima
- Ícone visual do clima

## Estrutura de Arquivos

```
weather-dashboard/
├── index.html          # Página HTML principal
├── styles-weather.css  # Estilos e design
└── app.js              # Lógica e integração com API
```

## API Utilizada

**OpenWeatherMap** - API gratuita e confiável para dados meteorológicos
- Base URL: `https://api.openweathermap.org/data/2.5`
- Endpoints utilizados:
  - `/weather` - Dados climáticos atuais
  - `/forecast` - Previsão de 5 dias

## Personalizações

### Mudar API Key
Se a chave gratuita incluída não funcionar:
1. Acesse [openweathermap.org](https://openweathermap.org)
2. Crie uma conta gratuita
3. Gere uma nova API Key
4. Substitua o valor em `app.js`:
```javascript
const API_KEY = 'sua_chave_aqui';
```

### Mudar Unidades de Temperatura
Em `app.js`, modifique o parâmetro `units`:
```javascript
// Para Fahrenheit
units=imperial

// Para Kelvin
units=standard
```

## Recursos Adicionais

- Animações suaves e transições
- Feedback visual para interações
- Tratamento de erros com mensagens amigáveis
- Ícones emoji para melhor visualização
- Design com efeito glassmorphism

## Notas Importantes

- A API OpenWeatherMap gratuita tem limite de requisições
- A busca suporta nomes de cidades em português e inglês
- O site funciona melhor em navegadores modernos (Chrome, Firefox, Edge, Safari)

## Autor

Desenvolvido como um dashboard meteorológico educacional.

---

**Divirta-se verificando o clima!** 🌍