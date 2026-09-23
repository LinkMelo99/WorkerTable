package Model;

import java.time.LocalDateTime;
import java.util.Date;

public class Tarefa {

    private String nome;
    private LocalDateTime date;
    private String notes;
    private Concluido concluido;

    private static enum Concluido {
        TRUE, FALSE
    }

    private Tarefa(builderTarefa build) {
        this.nome = build.nome;
        this.notes = build.notes;
        this.concluido = Concluido.FALSE;
        this.date = LocalDateTime.now();
    }

    public String getNome() {
        return nome;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public String getNotes() {
        return notes;
    }

    public Concluido getConcluido() {
        return concluido;
    }

    @Override
    public String toString() {
        return "Tarefa{" +
                "nome='" + nome + '\'' +
                ", date=" + date +
                ", notes='" + notes + '\'' +
                ", concluido=" + concluido +
                '}';
    }

    public void alterarNome(String novoNome) {
        this.nome = novoNome;
    }

    public static class builderTarefa {
        private String nome;
        private LocalDateTime date;
        private String notes;
        private Concluido concluido;

        public builderTarefa(String nome, String notes) {
            this.nome = nome;
            this.notes = notes;
            this.concluido = Concluido.FALSE;
            this.date = LocalDateTime.now();
        }
        public Tarefa build() {
            return new Tarefa(this);
        }
    }
}
