angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http) {
    
    $scope.app = "Lista Telefônica";

    $scope.contatos = [];

    $scope.operadoras = [];

    var carregarContatos = function () {
        $http.get("http://localhost:3412/contatos").then(function (response) {
            $scope.contatos = response.data;
        }).catch(function () {
            console.log('Erro no Get');
        });
    }

    var carregarOperadoras = function () {
        $http.get("http://localhost:3412/operadoras").then(function (response) {
            $scope.operadoras = response.data;
        }).catch(function () {
            console.log('Erro no Get');
        });
    }

    $scope.adicionarContato = function (contato) {
        contato.data = new Date();
        $http.post("http://localhost:3412/contatos", contato).then(function (response) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        }).catch(function () {
            console.log('Erro no Post');
        });
    };

    $scope.removerContato = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) {
                return contato;
            }
        });
    };

    $scope.contatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        });
    };

    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }

    carregarContatos();
    carregarOperadoras();
});