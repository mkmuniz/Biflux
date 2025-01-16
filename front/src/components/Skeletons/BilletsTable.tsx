import Section from '../Section/Section';
import Container from '../Container/Container';

export default function BilletsTableSkeleton() {
    return (
        <Section styles="bg-black min-h-screen w-full">
            <Container styles="max-w-6xl mx-auto">
                <HeaderSkeleton />
                <TableSkeleton />
                <GradientOverlay />
            </Container>
        </Section>
    );
}

const HeaderSkeleton = () => (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="h-8 w-32 bg-zinc-800/50 rounded-xl animate-pulse"></div>
        <SearchAndUploadSkeleton />
    </div>
);

const SearchAndUploadSkeleton = () => (
    <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
            <div className="w-full md:w-64 h-10 bg-zinc-800/50 rounded-xl animate-pulse"></div>
        </div>
        <div className="w-28 h-10 bg-[#8B5CF6]/20 rounded-xl animate-pulse"></div>
    </div>
);

const TableSkeleton = () => (
    <div className="bg-zinc-900/80 rounded-xl shadow-[0_4px_20px_rgba(139,92,246,0.1)] border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full">
                <TableHeader />
                <TableBody />
            </table>
        </div>
    </div>
);

const TableHeader = () => (
    <thead>
        <tr className="border-b border-zinc-800">
            <HeaderCell width="w-28" />
            <HeaderCell width="w-20" />
            <HeaderCell width="w-24" />
        </tr>
    </thead>
);

const HeaderCell = ({ width }: { width: string }) => (
    <th className="px-6 py-4 text-left">
        <div className={`h-4 ${width} bg-zinc-800/50 rounded-xl animate-pulse`}></div>
    </th>
);

const TableBody = () => (
    <tbody>
        {[...Array(5)].map((_, index) => (
            <TableRow key={index} />
        ))}
    </tbody>
);

const TableRow = () => (
    <tr className="border-b border-zinc-800 last:border-b-0">
        <TableCell width="w-32" />
        <TableCell width="w-24" />
        <ActionCell />
    </tr>
);

const TableCell = ({ width }: { width: string }) => (
    <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
            <div className={`h-4 ${width} bg-zinc-800/50 rounded-xl animate-pulse`}></div>
        </div>
    </td>
);

const ActionCell = () => (
    <td className="px-6 py-4">
        <div className="flex items-center gap-2">
            <div className="h-8 w-24 bg-[#8B5CF6]/20 rounded-xl animate-pulse"></div>
        </div>
    </td>
);

const GradientOverlay = () => (
    <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -inset-x-4 top-0 h-40 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute -inset-x-4 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
    </div>
); 