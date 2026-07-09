pipeline {
     agent any
    options {
        timestamps()
        skipDefaultCheckout(true)
    }

    stages {
      stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/nissimshitrit/cucumberjssampletest'
            }
        }
      stage('Install') {
          steps {
            bat 'call npm ci'
          }
        }

    stage('Check') {
      steps {
        script {
          def testStatus

          // Capture Cucumber exit status so we can still generate and publish JUnit output.
          testStatus = bat(script: 'call npm run test:json', returnStatus: true)
          bat 'call npm run report:junit'

          junit testResults: 'cucumber-report.xml', allowEmptyResults: false

          if (testStatus != 0) {
            error("Gherkin tests failed with exit code ${testStatus}")
          }
        }
        }
      }
        stage('bdd2octane') {
            steps {
                bat """
                    java -jar "C:\\bdd2octane\\bdd2octane-1.1.14-beta-SNAPSHOT.jar" --reportFiles=cucumber-report.xml --featureFiles=**/features/*.feature --framework=cucumber-js
                """
            }
        }
        stage('Results') {
             steps {
                 publishGherkinResults 'cucumber-js-result.xml'
            }
        }
    }
}

