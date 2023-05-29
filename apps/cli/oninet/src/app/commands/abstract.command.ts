import { CommandRunner } from 'nest-commander';

export abstract class AbstractCommand<TParams> extends CommandRunner {
    abstract main(args: string[], params: TParams): Promise<void>;

    constructor(public name: string) {
        super();
    }

    async run(_args: string[], params: TParams): Promise<void> {
        await this.main(_args, params);
    }
}
