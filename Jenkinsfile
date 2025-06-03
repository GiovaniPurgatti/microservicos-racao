pipeline {
  agent any

  environment {
    NODE_ENV = "development"
  }

  stages {
    stage('Parar serviços antigos') {
      steps {
        script {
          sh 'docker-compose -f api-catalogo/docker-compose.yml down || true'
          sh 'docker-compose -f api-pagamento/docker-compose.yml down || true'
          sh 'docker-compose -f api-pedidos/docker-compose.yml down || true'
          sh 'docker-compose -f api-usuario/docker-compose.yml down || true'
        }
      }
    }

    stage('Subir serviços') {
      steps {
        script {
          sh 'docker-compose -f api-catalogo/docker-compose.yml up -d --build'
          sh 'docker-compose -f api-pagamento/docker-compose.yml up -d --build'
          sh 'docker-compose -f api-pedidos/docker-compose.yml up -d --build'
          sh 'docker-compose -f api-usuario/docker-compose.yml up -d --build'
        }
      }
    }

    stage('Rodar frontend') {
      agent {
        docker {
          image 'node:18'  // versão do Node que quiser usar
          args '-u root'   // opcional, para rodar como root se precisar
        }
      }
      steps {
        dir('ui') {
          sh 'npm install'
          sh 'npm run dev &'
        }
      }
    }
  }
}
