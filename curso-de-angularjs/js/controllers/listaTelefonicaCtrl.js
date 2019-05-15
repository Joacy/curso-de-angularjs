angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http, $httpParamSerializer) {

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
        $http({
            method: 'POST',
            url: 'http://localhost:3412/contatos',
            data: $httpParamSerializer(contato),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
            console.log(response.data);
            console.log(response);
            console.log(contato);
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        }).catch(function (error) {
            console.log(error);
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